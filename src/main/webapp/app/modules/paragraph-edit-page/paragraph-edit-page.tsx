import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText, Table } from 'reactstrap';
import {
  isNumber,
  Translate,
  translate,
  ValidatedField,
  ValidatedForm,
  ValidatedBlobField,
  getSortState,
  openFile,
  byteSize,
  TextFormat,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  convertDateTimeFromServer,
  convertDateTimeToServer,
  displayDefaultDateTime,
} from 'app/shared/util/date-utils';
import {
  mapIdList,
  overrideSortStateWithQueryParams,
} from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IPost } from 'app/shared/model/post.model';
import { Status } from 'app/shared/model/enumerations/status.model';
import {
  createEntity,
  getEntity,
  reset,
  updateEntity,
} from 'app/entities/post/post.reducer';
import {
  getEntities,
  getEntitiesByPost,
} from 'app/entities/paragraph/paragraph.reducer';
import { ASC, DESC } from 'app/shared/util/pagination.constants';
import {
  faSort,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT } from 'app/config/constants';
import PostForm from './post-form';
import ParagraphTable from './paragraph-table';
import './PostEditPage.css';

export const ParagraphEditPage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;
  const currentUser = useAppSelector(state => state.authentication.account);

  const categories = useAppSelector(state => state.category.entities);
  const users = useAppSelector(state => state.userManagement.users);
  const postEntity = useAppSelector(state => state.post.entity);
  const loading = useAppSelector(state => state.post.loading);
  const updating = useAppSelector(state => state.post.updating);
  const updateSuccess = useAppSelector(state => state.post.updateSuccess);
  const statusValues = Object.keys(Status);

  const handleClose = () => {
    navigate(`/paragrapheditpage/${id}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCategories({}));
    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.view !== undefined && typeof values.view !== 'number') {
      values.view = Number(values.view);
    }
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updateAt = convertDateTimeToServer(values.updateAt);
    values.approvedAt = convertDateTimeToServer(values.approvedAt);
    values.modifiedAt = convertDateTimeToServer(values.modifiedAt);

    const entity = {
      ...postEntity,
      ...values,
      category: categories.find(
        it => it.id.toString() === values.category?.toString(),
      ),
      post: currentUser.id === 1 ? postEntity.post : currentUser, // Điều kiện kiểm tra id của currentUser
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
          updateAt: new Date().toISOString(),
          approvedAt: displayDefaultDateTime(),
          modifiedAt: displayDefaultDateTime(),
          post: currentUser.id,
        }
      : {
          status: 'PENDING',
          ...postEntity,
          createdAt: convertDateTimeFromServer(postEntity.createdAt),
          updateAt: convertDateTimeFromServer(postEntity.updateAt),
          approvedAt: convertDateTimeFromServer(postEntity.approvedAt),
          modifiedAt: convertDateTimeFromServer(postEntity.modifiedAt),
          category: postEntity?.category?.id,
          post: postEntity?.post?.id,
        };

  ////////////////

  const pageLocation = useLocation();

  const [sortState, setSortState] = useState(
    overrideSortStateWithQueryParams(
      getSortState(pageLocation, 'id'),
      pageLocation.search,
    ),
  );

  const paragraphList = useAppSelector(state => state.paragraph.entities);
  const paragraphloading = useAppSelector(state => state.paragraph.loading);

  const getAllEntities = () => {
    // dispatch(
    //   getEntities({
    //     sort: `${sortState.sort},${sortState.order}`,
    //   }),
    // );
    dispatch(getEntitiesByPost(id));
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };
  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="seaportApp.post.home.createOrEditLabel"
            data-cy="PostCreateUpdateHeading"
          >
            <Translate contentKey="seaportApp.post.home.createOrEditLabel">
              Create or edit a Post
            </Translate>
          </h2>
        </Col>
      </Row>
      <PostForm
        isNew={isNew}
        saveEntity={saveEntity}
        updating={updating}
        defaultValues={defaultValues}
        loading={loading}
      />
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="paragraph-heading" data-cy="ParagraphHeading">
            <Translate contentKey="seaportApp.paragraph.home.title">
              Paragraphs
            </Translate>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                color="info"
                onClick={handleSyncList}
                disabled={paragraphloading}
              >
                <FontAwesomeIcon icon="sync" spin={loading} />{' '}
                <Translate contentKey="seaportApp.paragraph.home.refreshListLabel">
                  Refresh List
                </Translate>
              </Button>
              <Link
                to={`/paragrapheditupdatepage/new?postId=${id}`}
                className="btn btn-primary jh-create-entity"
                id="jh-create-entity"
                data-cy="entityCreateButton"
              >
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="seaportApp.paragraph.home.createLabel">
                  Create new Paragraph
                </Translate>
              </Link>
            </div>
          </h2>
          <ParagraphTable
            paragraphList={paragraphList}
            openFile={openFile}
            loading={paragraphloading}
            handleSyncList={handleSyncList}
            postId={id}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ParagraphEditPage;
