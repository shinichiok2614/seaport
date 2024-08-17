import React from 'react';
import PostPageView from '../post-page-view/post-page-view';
import { ParagraphViewEachPostPage } from '../paragraph-view-each-postpage/paragraph-view-each-postpage';
import { Translate } from 'react-jhipster';

export const PostPageViewCenter = ({
  postEntity,
  paragraphList,
  loading = true,
}) => {
  return (
    <div className="PostPageViewCenter">
      <div className="PostPageViewCenter1">
        <PostPageView postEntity={postEntity}></PostPageView>
      </div>
      <div className="PostPageViewCenter2">
        <div className="PostPageViewCenter-summary">{postEntity.summary}</div>
        {paragraphList && paragraphList.length > 0
          ? paragraphList.map((paragraph, i) => (
              <ParagraphViewEachPostPage paragraph={paragraph} />
            ))
          : !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="seaportApp.paragraph.home.notFound">
                  No Paragraphs found
                </Translate>
              </div>
            )}
      </div>
    </div>
  );
};
