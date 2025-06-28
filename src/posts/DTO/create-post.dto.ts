export class CreatePostDto {
  title: string;
  content: string;
  authorId: number; // This can be used to set the author of the post
}
