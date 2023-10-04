import { Injectable } from '@nestjs/common';
import { CatchException } from '../exceptions/common.exception';
import * as moment from 'moment'
import { MinioService } from 'nestjs-minio-client'

@Injectable()
export class UploadService {
  constructor(
    private readonly minio: MinioService
  ) { }

  async upload(file: any[]) {
    try {
      const now = moment().format('DDMMYYYY')
      const url = []
      for (const item of file) {
        await this.minio.client.putObject(`social`, `${now}/${item.mimetype.split('/')[0]}/${item.originalname}`, item.buffer, {
          'Content-Type': item.mimetype,
          'X-Amz-Meta-Testing': 1234,
        })

        url.push(`/${now}/${item.mimetype.split('/')[0]}/${item.originalname}`)
      }
      return {url}
    } catch (e) {
      throw new CatchException(e)
    }
  }

}
