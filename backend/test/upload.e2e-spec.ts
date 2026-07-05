import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';
import { TestApp } from './test-app';

describe('Upload routes (/api/upload)', () => {
  const t = new TestApp();
  let adminToken: string;
  const uploaded: string[] = [];

  beforeAll(async () => {
    await t.start();
    adminToken = await t.adminToken();
  });

  afterAll(async () => {
    // Remove any files written to the real ./uploads directory during the run.
    for (const filename of uploaded) {
      const p = join(process.cwd(), 'uploads', filename);
      if (existsSync(p)) unlinkSync(p);
    }
    await t.stop();
  });

  // A tiny valid-enough PNG payload — content does not matter, only the mimetype.
  const pngBuffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  describe('POST /api/upload/image (admin only)', () => {
    it('uploads an image as admin and returns a url', async () => {
      const res = await t
        .http()
        .post('/api/upload/image')
        .set('Authorization', `Bearer ${adminToken}`)
        .attach('file', pngBuffer, { filename: 'pic.png', contentType: 'image/png' })
        .expect(201);

      expect(res.body.url).toContain('/api/upload/files/');
      uploaded.push(res.body.url.split('/').pop());
    });

    it('rejects an unauthenticated upload with 401', async () => {
      await t
        .http()
        .post('/api/upload/image')
        .attach('file', pngBuffer, { filename: 'pic.png', contentType: 'image/png' })
        .expect(401);
    });

    it('rejects a non-admin user with 403', async () => {
      const { token } = await t.signupUser();
      await t
        .http()
        .post('/api/upload/image')
        .set('Authorization', `Bearer ${token}`)
        .attach('file', pngBuffer, { filename: 'pic.png', contentType: 'image/png' })
        .expect(403);
    });

    it('rejects a non-image file type with 400', async () => {
      await t
        .http()
        .post('/api/upload/image')
        .set('Authorization', `Bearer ${adminToken}`)
        .attach('file', Buffer.from('hello'), {
          filename: 'note.txt',
          contentType: 'text/plain',
        })
        .expect(400);
    });

    it('rejects a request with no file with 400', async () => {
      await t
        .http()
        .post('/api/upload/image')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400);
    });
  });

  describe('GET /api/upload/files/:filename', () => {
    it('serves a previously uploaded file', async () => {
      const res = await t
        .http()
        .post('/api/upload/image')
        .set('Authorization', `Bearer ${adminToken}`)
        .attach('file', pngBuffer, { filename: 'serve.png', contentType: 'image/png' });
      const filename = res.body.url.split('/').pop();
      uploaded.push(filename);

      await t.http().get(`/api/upload/files/${filename}`).expect(200);
    });

    it('returns an error for a non-existent file', async () => {
      const res = await t.http().get('/api/upload/files/does-not-exist.png');
      expect(res.status).toBeGreaterThanOrEqual(400);
    });
  });
});
