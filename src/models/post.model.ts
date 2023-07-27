import { Iposts } from '../interface/posts.interface';

const posts: Array<Iposts> = [];
export class Post {
  //methods

  //add post
  static add(data: Omit<Iposts, 'postId'>): Iposts | null {
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
  //edit post
  static edit(
    id: number,
    data: Partial<Omit<Iposts, 'postId'>>,
  ): Iposts | null {
    const foundIndex = posts.findIndex(a => a.postId === id);
    if (foundIndex === -1) return null;

    const oldPost = posts[foundIndex];
    if (data.title) {
      oldPost.title = data.title;
    }
    if (data.posts) {
      oldPost.posts = data.posts;
    }

    return oldPost;
  }

  //delete post
  static delete(id: number): Iposts | null {
    const foundIndex = posts.findIndex(a => a.postId === id);
    if (foundIndex === -1) return null;

    //ISSUE:delete not working
    const post = { ...posts[foundIndex] };

    posts.splice(foundIndex, 1);
    return post;
  }
}
