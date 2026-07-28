import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from './schemas/location.schema';
import { CreateLocationDto } from './dto/create-location.dto';
import { UsersService } from '../users/users.service';

export interface VisitorLocationResponse {
  _id: string;
  userId: string | null;
  guestId: string | null;
  latitude: number;
  longitude: number;
  accuracy: number | null;
  path: string | null;
  ip: string | null;
  userAgent: string | null;
  createdAt: string;
  updatedAt: string;
  userName: string | null;
  userEmail: string | null;
}

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
    private readonly usersService: UsersService,
  ) {}

  async upsert(
    dto: CreateLocationDto,
    userId: string | null,
    ip: string | null,
    userAgent: string | null,
  ): Promise<LocationDocument> {
    // one live record per identity — logged-in users are keyed by userId,
    // guests by the client-generated guestId, so each ping refreshes the "current" location
    const filter = userId ? { userId } : { guestId: dto.guestId ?? null };

    return this.locationModel
      .findOneAndUpdate(
        filter,
        {
          userId,
          guestId: userId ? null : dto.guestId ?? null,
          latitude: dto.latitude,
          longitude: dto.longitude,
          accuracy: dto.accuracy ?? null,
          path: dto.path ?? null,
          ip,
          userAgent,
        },
        { new: true, upsert: true },
      )
      .exec();
  }

  async findAll(): Promise<VisitorLocationResponse[]> {
    const locations = await this.locationModel.find().sort({ updatedAt: -1 }).exec();

    const userIds = [...new Set(locations.map((l) => l.userId).filter(Boolean))] as string[];
    const users = await Promise.all(userIds.map((id) => this.usersService.findById(id)));
    const userMap = new Map(users.filter(Boolean).map((u) => [u!._id.toString(), u]));

    return locations.map((l) => {
      const user = l.userId ? userMap.get(l.userId) : null;
      const json = l.toJSON() as Record<string, any>;
      const result: VisitorLocationResponse = {
        _id: json._id,
        userId: json.userId,
        guestId: json.guestId,
        latitude: json.latitude,
        longitude: json.longitude,
        accuracy: json.accuracy,
        path: json.path,
        ip: json.ip,
        userAgent: json.userAgent,
        createdAt: json.createdAt,
        updatedAt: json.updatedAt,
        userName: user?.name ?? null,
        userEmail: user?.email ?? null,
      };
      return result;
    });
  }
}
