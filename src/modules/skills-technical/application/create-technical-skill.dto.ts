import { IsInt, IsNotEmpty, IsString, Matches, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTechnicalSkillDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?! ).{1,50}$/, { message: 'name debe tener hasta 50 caracteres y no iniciar con un espacio.' })
  @Matches(/^[A-Za-zÀ-ÿ0-9\s-]+$/, { message: 'name solo puede incluir letras, numeros, espacios y guiones.' })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?! ).{1,200}$/, { message: 'type debe tener hasta 200 caracteres y no iniciar con un espacio.' })
  @Matches(/^[A-Za-zÀ-ÿ0-9\s-]+$/, { message: 'type solo puede incluir letras, numeros, espacios y guiones.' })
  type!: string;

  @Type(() => Number)
  @IsInt()
  @Min(0, { message: 'percentage debe ser al menos 0.' })
  @Max(100, { message: 'percentage no puede superar 100.' })
  percentage!: number;
}
