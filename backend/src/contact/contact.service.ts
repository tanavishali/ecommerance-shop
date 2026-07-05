import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(@InjectModel(Contact.name) private contactModel: Model<ContactDocument>) {}

  async create(dto: CreateContactDto, userId: string | null = null): Promise<ContactDocument> {
    const contact = new this.contactModel({ ...dto, userId });
    return contact.save();
  }

  async findAll(): Promise<ContactDocument[]> {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }

  async updateStatus(id: string, status: string): Promise<ContactDocument> {
    const updated = await this.contactModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Message not found');
    return updated;
  }
}
