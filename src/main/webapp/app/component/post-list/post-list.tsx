// PostList.js
import React, { useState } from 'react';
import { Input, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate } from 'react-jhipster';
import PostCard from '../post-card/post-card';

const PostList = ({ postList, sort, getSortIconByFieldName }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredPostList = postList.filter(post => post.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="table-responsive">
      <Input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearchChange} className="mb-3" />
      {filteredPostList && filteredPostList.length > 0 ? (
        <Table responsive>
          <thead>
            <tr>
              {/* <th className="hand" onClick={sort('id')}>
                <Translate contentKey="seaportApp.post.id">ID</Translate>{' '}
                <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
              </th> */}
              <th className="hand" onClick={sort('image')}>
                <Translate contentKey="seaportApp.post.image">Image</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('image')} />
              </th>
              <th className="hand" onClick={sort('name')}>
                <Translate contentKey="seaportApp.post.name">Name</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
              </th>
              <th className="hand" onClick={sort('summary')}>
                <Translate contentKey="seaportApp.post.summary">Summary</Translate>{' '}
                <FontAwesomeIcon icon={getSortIconByFieldName('summary')} />
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
            {filteredPostList.map((post, i) => (
              <PostCard key={`entity-${i}`} post={post} />
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="alert alert-warning">
          <Translate contentKey="seaportApp.post.home.notFound">No Posts found</Translate>
        </div>
      )}
    </div>
  );
};

export default PostList;
