import { IsNotEmpty, IsNumber, IsString, Length, Matches, Max, Min } from 'class-validator';

export class CreateProfessionalSkillDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @Matches(/^(?! )[A-Za-zÀ-ÿ0-9\s-]+$/, {
    message: 'name debe tener entre 1 y 50 caracteres y no puede iniciar con un espacio.',
  })
  name!: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  icon!: string;
}
