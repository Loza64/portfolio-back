import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @Matches(/^(?! )[A-Za-zÀ-ÿ]+( [A-Za-zÀ-ÿ]+)*$/, {
    message: 'firstName debe tener al menos 2 caracteres y no puede iniciar con un espacio.',
  })
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @Matches(/^(?! )[A-Za-zÀ-ÿ]+( [A-Za-zÀ-ÿ]+)*$/, {
    message: 'lastName debe tener al menos 2 caracteres y no puede iniciar con un espacio.',
  })
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  @Matches(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/, { message: 'email tiene un formato invalido.' })
  email!: string;

  @IsNotEmpty()
  @MinLength(4)
  @Matches(/^\+?[1-9]\d{1,14}([ -]?[\d()]+)*$/, { message: 'phone es invalido.' })
  phone!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  @Matches(/^[a-zA-ZÁ-ÿ0-9\s.,()-]+$/, { message: 'message contiene caracteres no permitidos.' })
  message!: string;
}
