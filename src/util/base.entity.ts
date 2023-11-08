import * as moment from "moment";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
    @CreateDateColumn({
        type: 'timestamp',
        transformer: {
            to: () => {
                return moment().toDate();
              },
              from: (value: Date) => value,
        }
    })
    created_at: string

    @UpdateDateColumn({
        type: 'timestamp',
        transformer: {
            to: () => {
                return moment().toDate();
              },
              from: (value: Date) => value,
        }
    })
    updated_at: string
}