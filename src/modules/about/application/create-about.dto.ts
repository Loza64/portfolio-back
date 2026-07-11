import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateAboutDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date debe tener el formato YYYY-MM-DD.' })
  date!: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  @Matches(/^(?! )[A-Za-zÀ-ÿ0-9\s-]+$/, {
    message: 'title debe tener entre 5 y 50 caracteres y no puede iniciar con un espacio.',
  })
  title!: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 500)
  @Matches(/^[A-Za-zÀ-ÿ0-9\s.,!()-]+$/, {
    message: 'description debe tener entre 10 y 500 caracteres y solo puede incluir letras, numeros y puntuacion basica.',
  })
  description!: string;
}
