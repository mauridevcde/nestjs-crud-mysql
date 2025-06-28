import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './DTO/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepositoty: Repository<Post>,
    private userService: UsersService,
  ) {}
  createPost(post: CreatePostDto) {
    const userFound = this.userService.getUser(post.authorId);
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newPost = this.postRepositoty.create(post);
    return this.postRepositoty.save(newPost);
  }
  getPosts() {
    return this.postRepositoty.find({
      relations: ['author'],
    });
  }
}
