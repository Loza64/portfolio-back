import { IsNotEmpty, IsOptional, IsString, Length, Matches, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProjectLinksDto {
  @IsOptional()
  @IsString()
  github?: string | null;

  @IsOptional()
  @IsString()
  app?: string | null;
}

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  @Matches(/^(?! )[A-Za-zÀ-ÿ0-9\s-]+$/, {
    message: 'title debe tener entre 2 y 50 caracteres y no puede iniciar con un espacio.',
  })
  title!: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 500)
  @Matches(/^[A-Za-zÀ-ÿ0-9\s.:,!()\-_]+$/, {
    message: 'description debe tener entre 10 y 500 caracteres y solo puede incluir letras, numeros y puntuacion basica.',
  })
  description!: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ProjectLinksDto)
  links!: ProjectLinksDto;
}
