import { ValidationError } from "@nestjs/common";
import * as moment from "moment-timezone";

export class UtilCommonTemplate {
    static getMessageValidator(errors: ValidationError[]) {
        return errors
          .map((item) => {
            return Object.keys(item.constraints)
              .map((obj) => item.constraints[obj])
              .join(',');
          })
          .join(',');
      }

    static getDate(value: string): Date{
      return moment(value).utc(true).toDate()
    }  
}