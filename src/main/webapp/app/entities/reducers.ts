import person from 'app/entities/person/person.reducer';
import department from 'app/entities/department/department.reducer';
import category from 'app/entities/category/category.reducer';
import post from 'app/entities/post/post.reducer';
import paragraph from 'app/entities/paragraph/paragraph.reducer';
import comment from 'app/entities/comment/comment.reducer';
import message from 'app/entities/message/message.reducer';
import room from 'app/entities/room/room.reducer';
import roomMember from 'app/entities/room-member/room-member.reducer';
import follow from 'app/entities/follow/follow.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  person,
  department,
  category,
  post,
  paragraph,
  comment,
  message,
  room,
  roomMember,
  follow,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
