import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from './profiles/profiles.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1234',
        database: 'nestjsdb',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      })
    ,UsersModule, ProfilesModule, PostsModule],
  controllers: [AppController, ],
  providers: [AppService],
})
export class AppModule {}
