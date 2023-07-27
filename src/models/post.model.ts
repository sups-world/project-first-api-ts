import { Iposts } from '../interface/posts.interface';

const posts: Array<Iposts> = [];
export class Post {
  //methods

  //add post
  static add(data: Omit<Iposts, 'postId'>): Iposts {
    let postId = 1;
    if (posts.length) {
      postId = posts[posts.length - 1].postId + 1;
    }
    const post = { postId, ...data };

    posts.push(post);
    return post;
  }

  //view all posts
  static view() {
    return posts;
  }

  //view posts by id
  static viewOne(id: number): Iposts | null {
    const found = posts.find(a => a.postId === id);
    if (!found) return null;
    return found;
  }
}
