import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_DATE_FORMAT } from 'app/config/constants';
import './post-page.css'; // Import tệp CSS mới của bạn

export const PostPageView = ({ postEntity }) => {
  return (
    <div className="PostPageView">
      {postEntity.image && postEntity.imageContentType && (
        <img
          src={`data:${postEntity.imageContentType};base64,${postEntity.image}`}
          alt="Post Image"
          className="PostPageView1"
        />
      )}
      <div className="PostPageView2">{postEntity.name}</div>
      <div className="PostPageView3">
        {postEntity.person && (
          <div className="PostPageView3-1">{postEntity.person.name}</div>
        )}
        {postEntity.person && (
          <img
            src={`data:${postEntity.person.avatarContentType};base64,${postEntity.person.avatar}`}
            alt="Avatar Image"
          />
        )}
      </div>
    </div>
  );
};
export default PostPageView;
