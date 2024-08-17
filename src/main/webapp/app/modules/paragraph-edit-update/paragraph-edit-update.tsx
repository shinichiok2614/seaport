// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
// import { Button, Row, Col, FormText } from 'reactstrap';
// import {
//   isNumber,
//   Translate,
//   translate,
//   ValidatedField,
//   ValidatedForm,
//   ValidatedBlobField,
// } from 'react-jhipster';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import {
//   convertDateTimeFromServer,
//   convertDateTimeToServer,
//   displayDefaultDateTime,
// } from 'app/shared/util/date-utils';
// import { mapIdList } from 'app/shared/util/entity-utils';
// import { useAppDispatch, useAppSelector } from 'app/config/store';

// import { IPost } from 'app/shared/model/post.model';
// import {
//   getEntity as getPost,
//   getEntities as getPosts,
// } from 'app/entities/post/post.reducer';
// import { IParagraph } from 'app/shared/model/paragraph.model';
// import {
//   reset,
//   getEntity,
//   updateEntity,
//   createEntity,
// } from 'app/entities/paragraph/paragraph.reducer';
// import EditorComponent from './EditorComponent';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// export const ParagraphEditUpdate = () => {
//   const dispatch = useAppDispatch();

//   const navigate = useNavigate();

//   const { id } = useParams<'id'>();
//   const isNew = id === undefined || id === 'new';

//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const postId = searchParams.get('postId');
//   const posts = useAppSelector(state => state.post.entities);
//   const postEntity = useAppSelector(state => state.post.entity);
//   const paragraphEntity = useAppSelector(state => state.paragraph.entity);
//   const loading = useAppSelector(state => state.paragraph.loading);
//   const updating = useAppSelector(state => state.paragraph.updating);
//   const updateSuccess = useAppSelector(state => state.paragraph.updateSuccess);
//   const handleClose = () => {
//     navigate(`/paragrapheditpage/${postId}`);
//   };

//   useEffect(() => {
//     if (isNew) {
//       dispatch(reset());
//     } else {
//       dispatch(getEntity(id));
//     }

//     console.log('Paragraph ID:', id);
//     console.log('Post ID:', postId);
//     // dispatch(getPosts({}));
//     dispatch(getPost(postId));
//   }, []);

//   useEffect(() => {
//     if (updateSuccess) {
//       handleClose();
//     }
//   }, [updateSuccess]);

//   // eslint-disable-next-line complexity
//   const saveEntity = values => {
//     if (values.id !== undefined && typeof values.id !== 'number') {
//       values.id = Number(values.id);
//     }
//     values.createdAt = convertDateTimeToServer(values.createdAt);
//     values.updatedAt = convertDateTimeToServer(values.updatedAt);

//     const entity = {
//       ...paragraphEntity,
//       ...values,
//       content: JSON.stringify(content),
//       paragraph: postEntity,
//       // paragraph: posts.find(
//       //   it => it.id.toString() === values.paragraph?.toString(),
//       // ),
//     };
//     if (isNew) {
//       dispatch(createEntity(entity));
//     } else {
//       dispatch(updateEntity(entity));
//     }
//   };
//   ///////
//   const [content, setContent] = useState({});
//   const [isContentLoaded, setIsContentLoaded] = useState(false);
//   useEffect(() => {
//     if (!isNew && paragraphEntity.content) {
//       try {
//         const parsedContent = JSON.parse(paragraphEntity.content);
//         if (
//           parsedContent &&
//           typeof parsedContent === 'object' &&
//           parsedContent.blocks
//         ) {
//           setContent(parsedContent);
//           setIsContentLoaded(true);
//         } else {
//           console.error('Invalid content structure', parsedContent);
//         }
//       } catch (e) {
//         console.error('Failed to parse paragraph content', e);
//       }
//     } else if (isNew) {
//       setIsContentLoaded(true); // For new entities, no need to load existing content
//     }
//   }, [paragraphEntity.content, isNew]);
//   const defaultValues = () =>
//     isNew
//       ? {
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//         }
//       : {
//           ...paragraphEntity,
//           createdAt: convertDateTimeFromServer(paragraphEntity.createdAt),
//           updatedAt: convertDateTimeFromServer(paragraphEntity.updatedAt),
//           paragraph: paragraphEntity?.paragraph?.id,
//         };

//   return (
//     <div>
//       <Row className="justify-content-center">
//         <Col md="8">
//           <h2
//             id="seaportApp.paragraph.home.createOrEditLabel"
//             data-cy="ParagraphCreateUpdateHeading"
//           >
//             <Translate contentKey="seaportApp.paragraph.home.createOrEditLabel">
//               Create or edit a Paragraph
//             </Translate>
//           </h2>
//         </Col>
//       </Row>
//       <Row className="justify-content-center">
//         <Col md="8">
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <ValidatedForm
//               defaultValues={defaultValues()}
//               onSubmit={saveEntity}
//             >
//               {!isNew ? (
//                 <ValidatedField
//                   name="id"
//                   required
//                   readOnly
//                   id="paragraph-id"
//                   label={translate('global.field.id')}
//                   validate={{ required: true }}
//                 />
//               ) : null}
//               <ValidatedBlobField
//                 label={translate('seaportApp.paragraph.image')}
//                 id="paragraph-image"
//                 name="image"
//                 data-cy="image"
//                 isImage
//                 accept="image/*"
//               />
//               <ValidatedField
//                 label={translate('seaportApp.paragraph.caption')}
//                 id="paragraph-caption"
//                 name="caption"
//                 data-cy="caption"
//                 type="text"
//               />
//               {/* <ValidatedField
//                 label={translate('seaportApp.paragraph.content')}
//                 id="paragraph-content"
//                 name="content"
//                 data-cy="content"
//                 type="textarea"
//               /> */}
//               {/* {isContentLoaded && (
//                 <EditorComponent data={content} onChange={setContent} />
//               )} */}
//               {isContentLoaded && (
//                 <CKEditor
//                   editor={ClassicEditor}
//                   // data={content}
//                   onChange={(event, editor) => {
//                     const data = editor.getData();
//                     setContent(data);
//                   }}
//                 />
//               )}
//               <Button
//                 color="primary"
//                 id="save-entity"
//                 data-cy="entityCreateSaveButton"
//                 type="submit"
//                 disabled={updating}
//               >
//                 <FontAwesomeIcon icon="save" />
//                 &nbsp;
//                 <Translate contentKey="entity.action.save">Save</Translate>
//               </Button>
//             </ValidatedForm>
//           )}
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default ParagraphEditUpdate;

// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
// import { Button, Row, Col, FormText } from 'reactstrap';
// import {
//   isNumber,
//   Translate,
//   translate,
//   ValidatedField,
//   ValidatedForm,
//   ValidatedBlobField,
// } from 'react-jhipster';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import {
//   convertDateTimeFromServer,
//   convertDateTimeToServer,
//   displayDefaultDateTime,
// } from 'app/shared/util/date-utils';
// import { mapIdList } from 'app/shared/util/entity-utils';
// import { useAppDispatch, useAppSelector } from 'app/config/store';

// import { IPost } from 'app/shared/model/post.model';
// import {
//   getEntity as getPost,
//   getEntities as getPosts,
// } from 'app/entities/post/post.reducer';
// import { IParagraph } from 'app/shared/model/paragraph.model';
// import {
//   reset,
//   getEntity,
//   updateEntity,
//   createEntity,
// } from 'app/entities/paragraph/paragraph.reducer';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// export const ParagraphEditUpdate = () => {
//   const dispatch = useAppDispatch();

//   const navigate = useNavigate();

//   const { id } = useParams<'id'>();
//   const isNew = id === undefined || id === 'new';

//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const postId = searchParams.get('postId');
//   const posts = useAppSelector(state => state.post.entities);
//   const postEntity = useAppSelector(state => state.post.entity);
//   const paragraphEntity = useAppSelector(state => state.paragraph.entity);
//   const loading = useAppSelector(state => state.paragraph.loading);
//   const updating = useAppSelector(state => state.paragraph.updating);
//   const updateSuccess = useAppSelector(state => state.paragraph.updateSuccess);
//   const handleClose = () => {
//     navigate(`/paragrapheditpage/${postId}`);
//   };

//   useEffect(() => {
//     if (isNew) {
//       dispatch(reset());
//     } else {
//       dispatch(getEntity(id));
//     }

//     console.log('Paragraph ID:', id);
//     console.log('Post ID:', postId);
//     // dispatch(getPosts({}));
//     dispatch(getPost(postId));
//   }, []);

//   useEffect(() => {
//     if (updateSuccess) {
//       handleClose();
//     }
//   }, [updateSuccess]);

//   const [content, setContent] = useState('');
//   const [isContentLoaded, setIsContentLoaded] = useState(false);

//   useEffect(() => {
//     if (!isNew && paragraphEntity.content) {
//       setContent(paragraphEntity.content);
//       setIsContentLoaded(true);
//     } else if (isNew) {
//       setIsContentLoaded(true); // Đối với các thực thể mới, không cần tải nội dung hiện có
//     }
//   }, [paragraphEntity.content, isNew]);

//   const saveEntity = values => {
//     if (values.id !== undefined && typeof values.id !== 'number') {
//       values.id = Number(values.id);
//     }
//     values.createdAt = convertDateTimeToServer(values.createdAt);
//     values.updatedAt = convertDateTimeToServer(values.updatedAt);

//     const entity = {
//       ...paragraphEntity,
//       ...values,
//       content,
//       paragraph: postEntity,
//     };

//     if (isNew) {
//       dispatch(createEntity(entity));
//     } else {
//       dispatch(updateEntity(entity));
//     }
//   };

//   const defaultValues = () =>
//     isNew
//       ? {
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//         }
//       : {
//           ...paragraphEntity,
//           createdAt: convertDateTimeFromServer(paragraphEntity.createdAt),
//           updatedAt: new Date().toISOString(),
//           paragraph: paragraphEntity?.paragraph?.id,
//         };

//   return (
//     <div>
//       <Row className="justify-content-center">
//         <Col md="8">
//           <h2
//             id="seaportApp.paragraph.home.createOrEditLabel"
//             data-cy="ParagraphCreateUpdateHeading"
//           >
//             <Translate contentKey="seaportApp.paragraph.home.createOrEditLabel">
//               Create or edit a Paragraph
//             </Translate>
//           </h2>
//         </Col>
//       </Row>
//       <Row className="justify-content-center">
//         <Col md="8">
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <ValidatedForm
//               defaultValues={defaultValues()}
//               onSubmit={saveEntity}
//             >
//               {!isNew ? (
//                 <ValidatedField
//                   name="id"
//                   required
//                   readOnly
//                   id="paragraph-id"
//                   label={translate('global.field.id')}
//                   validate={{ required: true }}
//                 />
//               ) : null}
//               <ValidatedBlobField
//                 label={translate('seaportApp.paragraph.image')}
//                 id="paragraph-image"
//                 name="image"
//                 data-cy="image"
//                 isImage
//                 accept="image/*"
//               />
//               <ValidatedField
//                 label={translate('seaportApp.paragraph.caption')}
//                 id="paragraph-caption"
//                 name="caption"
//                 data-cy="caption"
//                 type="text"
//               />
//               {isContentLoaded && (
//                 <CKEditor
//                   editor={ClassicEditor}
//                   data={content}
//                   onChange={(event, editor) => {
//                     const data = editor.getData();
//                     setContent(data);
//                   }}
//                 />
//               )}
//               <Button
//                 color="primary"
//                 id="save-entity"
//                 data-cy="entityCreateSaveButton"
//                 type="submit"
//                 disabled={updating}
//               >
//                 <FontAwesomeIcon icon="save" />
//                 &nbsp;
//                 <Translate contentKey="entity.action.save">Save</Translate>
//               </Button>
//             </ValidatedForm>
//           )}
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default ParagraphEditUpdate;

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import {
  isNumber,
  Translate,
  translate,
  ValidatedField,
  ValidatedForm,
  ValidatedBlobField,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  convertDateTimeFromServer,
  convertDateTimeToServer,
  displayDefaultDateTime,
} from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPost } from 'app/shared/model/post.model';
import { getEntities as getPosts } from 'app/entities/post/post.reducer';
import { IParagraph } from 'app/shared/model/paragraph.model';
import {
  getEntity,
  updateEntity,
  createEntity,
  reset,
} from 'app/entities/paragraph/paragraph.reducer';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const ParagraphEditUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined || id === 'new';
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get('postId');

  const post = useAppSelector(state => state.post.entity);
  const paragraphEntity = useAppSelector(state => state.paragraph.entity);
  const loading = useAppSelector(state => state.paragraph.loading);
  const updating = useAppSelector(state => state.paragraph.updating);
  const updateSuccess = useAppSelector(state => state.paragraph.updateSuccess);

  const handleClose = () => {
    navigate(`/paragrapheditpage/${postId}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPosts({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const [content, setContent] = useState('');
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    if (!isNew && paragraphEntity.content) {
      setContent(paragraphEntity.content);
      setIsContentLoaded(true);
    } else if (isNew) {
      setIsContentLoaded(true); // Đối với các thực thể mới, không cần tải nội dung hiện có
    }
  }, [paragraphEntity.content, isNew]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updatedAt = convertDateTimeToServer(values.updatedAt);

    const entity = {
      ...paragraphEntity,
      ...values,
      content,
      paragraph: post,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      : {
          ...paragraphEntity,
          createdAt: convertDateTimeFromServer(paragraphEntity.createdAt),
          updatedAt: new Date().toISOString(),
          content: paragraphEntity.content, //thiếu reset
          paragraph: paragraphEntity?.paragraph?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="seaportApp.paragraph.home.createOrEditLabel"
            data-cy="ParagraphCreateUpdateHeading"
          >
            <Translate contentKey="seaportApp.paragraph.home.createOrEditLabel">
              Create or edit a Paragraph
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm
              defaultValues={defaultValues()}
              onSubmit={saveEntity}
            >
              <ValidatedBlobField
                label={translate('seaportApp.paragraph.image')}
                id="paragraph-image"
                name="image"
                data-cy="image"
                isImage
                accept="image/*"
              />
              <ValidatedField
                label={translate('seaportApp.paragraph.caption')}
                id="paragraph-caption"
                name="caption"
                data-cy="caption"
                type="text"
              />
              {isContentLoaded && (
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                  }}
                />
              )}
              <Button
                color="primary"
                id="save-entity"
                data-cy="entityCreateSaveButton"
                type="submit"
                disabled={updating}
              >
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ParagraphEditUpdate;
