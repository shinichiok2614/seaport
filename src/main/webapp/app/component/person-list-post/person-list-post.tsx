import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import PostList from 'app/component/post-list/post-list';
import { getEntities } from 'app/entities/post/post.reducer';

export const PersonListPost = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const postList = useAppSelector(state => state.post.entities);
  const loading = useAppSelector(state => state.post.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
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
      <h2 id="post-heading" data-cy="PostHeading">
        <Translate contentKey="seaportApp.post.home.title">Posts</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="seaportApp.post.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/post/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="seaportApp.post.home.createLabel">Create new Post</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {postList && postList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="seaportApp.post.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="seaportApp.post.name">Name</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                </th>
                {/* <th className="hand" onClick={sort('summary')}>
                  <Translate contentKey="seaportApp.post.summary">
                    Summary
                  </Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('summary')} />
                </th> */}
                <th className="hand" onClick={sort('image')}>
                  <Translate contentKey="seaportApp.post.image">Image</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('image')} />
                </th>
                <th className="hand" onClick={sort('status')}>
                  <Translate contentKey="seaportApp.post.status">Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('status')} />
                </th>
                <th className="hand" onClick={sort('view')}>
                  <Translate contentKey="seaportApp.post.view">View</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('view')} />
                </th>
                <th className="hand" onClick={sort('remark')}>
                  <Translate contentKey="seaportApp.post.remark">Remark</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('remark')} />
                </th>
                <th className="hand" onClick={sort('createdAt')}>
                  <Translate contentKey="seaportApp.post.createdAt">Created At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('createdAt')} />
                </th>
                <th className="hand" onClick={sort('updateAt')}>
                  <Translate contentKey="seaportApp.post.updateAt">Update At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('updateAt')} />
                </th>
                <th className="hand" onClick={sort('approvedAt')}>
                  <Translate contentKey="seaportApp.post.approvedAt">Approved At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('approvedAt')} />
                </th>
                <th className="hand" onClick={sort('modifiedAt')}>
                  <Translate contentKey="seaportApp.post.modifiedAt">Modified At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('modifiedAt')} />
                </th>
                <th>
                  <Translate contentKey="seaportApp.post.category">Category</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="seaportApp.post.post">Post</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {postList.map((post, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/post/${post.id}`} color="link" size="sm">
                      {post.id}
                    </Button>
                  </td>
                  <td>{post.name}</td>
                  {/* <td>{post.summary}</td> */}
                  <td>
                    {post.image ? (
                      <div>
                        {post.imageContentType ? (
                          <a onClick={openFile(post.imageContentType, post.image)}>
                            <img src={`data:${post.imageContentType};base64,${post.image}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {post.imageContentType}, {byteSize(post.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <Translate contentKey={`seaportApp.Status.${post.status}`} />
                  </td>
                  <td>{post.view}</td>
                  <td>{post.remark}</td>
                  <td>{post.createdAt ? <TextFormat type="date" value={post.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{post.updateAt ? <TextFormat type="date" value={post.updateAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{post.approvedAt ? <TextFormat type="date" value={post.approvedAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{post.modifiedAt ? <TextFormat type="date" value={post.modifiedAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{post.category ? <Link to={`/category/${post.category.id}`}>{post.category.name}</Link> : ''}</td>
                  <td>{post.post ? post.post.login : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/paragrapheditpage/${post.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.createcontent">Create Content</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/post/${post.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/post/${post.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/post/${post.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="seaportApp.post.home.notFound">No Posts found</Translate>
            </div>
          )
        )}
        {/* <PostList
          postList={postList}
          sort={sort}
          getSortIconByFieldName={getSortIconByFieldName}
        /> */}
      </div>
    </div>
  );
};

export default PersonListPost;
