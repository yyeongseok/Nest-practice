import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const typeORMconfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'kim-yeongseok',
    password: 'dud159357',
    database: 'postgres',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],  //entity 를 이용해서 데이터베이스 테이블을 생성해준다. 그래서 entity 파일이 어디있는지 설정함//
    synchronize: true  //true 값을 주면 에플리케이션이 다시 실행될때 엔티티안에서 수정된 컬럼의 길이 타입 변경된 값등을 해당 테이블에 drop한 후 다시 생성함//
}

