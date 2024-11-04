import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class GenreService {
    constructor(private readonly repository: Repository<any>,
        private readonly entotyName: string,
    ) {}

    
}