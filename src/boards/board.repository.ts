import { Inject, Injectable } from "@nestjs/common";
import { Repository, EntityRepository } from "typeorm";
import { Board } from "./board.entity";
import { BoardStatus } from "./boards.model";
import { createBoardDto } from "./dto/create-board.dto";


@Injectable()
export class BoardRepository extends Repository<Board> {

    async createBoard(createBoardDto: createBoardDto) : Promise <Board> {
        const {title, description} = createBoardDto
        
        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.save(board)
        return board
    }
}

// @Injectable()
// export class UserRepository {
//   constructor(
//     @InjectRepository(UserEntity)
//     private readonly userRepository: Repository<UserEntity>,
//   ) {}
// }

// @Injecatable()
// export class BoardRepository {
//    constructor(
//
//    )
//}