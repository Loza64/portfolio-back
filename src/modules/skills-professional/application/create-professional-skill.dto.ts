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
  @IsNumber()
  @Min(0, { message: 'percentage debe ser al menos 0.' })
  @Max(100, { message: 'percentage no puede superar 100.' })
  percentage!: number;
}
