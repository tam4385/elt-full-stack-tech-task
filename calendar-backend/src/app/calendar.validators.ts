import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsStartBeforeEnd(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStartBeforeEnd',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(_: any, args: ValidationArguments) {
          const obj = args.object as any;
          if (!obj.start || !obj.end) {
            return true;   // skip if missing
          }
          const start = new Date(obj.start).getTime();
          const end   = new Date(obj.end).getTime();
          return start < end;
        },
        defaultMessage(args: ValidationArguments) {
          return 'start must be earlier than end';
        },
      },
    });
  };
}
