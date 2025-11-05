import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsStartBeforeEnd(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isStartBeforeEnd',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(_: unknown, args: ValidationArguments) {
          const obj = args.object as { start: string; end: string };
          if (!obj.start || !obj.end) {
            return true;
          }
          const start = new Date(obj.start).getTime();
          const end = new Date(obj.end).getTime();
          return start < end;
        },
        defaultMessage(_: ValidationArguments) {
          return 'start must be earlier than end';
        },
      },
    });
  };
}
