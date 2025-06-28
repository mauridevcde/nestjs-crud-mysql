import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  authorId: number; // Relación ManyToOne con User, pero no es necesario si se usa author

  @ManyToOne(() => User, (user) => user.posts) // Relación ManyToOne con User
  author: User; // Relación ManyToOne con User
}
