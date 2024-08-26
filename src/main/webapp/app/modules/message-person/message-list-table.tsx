import React from 'react';
import { Table, Button } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { APP_DATE_FORMAT } from 'app/config/constants';

export const MessageListTable = ({ messageList, sort, getSortIconByFieldName }) => {
  return (
    <div className="table-responsive MessagePersonRoomMember-message-list-container">
      {messageList && messageList.length > 0 ? (
        <Table responsive>
          <thead>
            <tr>
              <th className="hand" onClick={sort('id')}>
                <Translate contentKey="seaportApp.message.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
              </th>
              <th className="hand" onClick={sort('content')}>
                <Translate contentKey="seaportApp.message.content">Content</Translate>{' '}
                <FontAwesomeIcon icon={getSortIconByFieldName('content')} />
              </th>
              <th className="hand" onClick={sort('createdAt')}>
                <Translate contentKey="seaportApp.message.createdAt">Created At</Translate>{' '}
                <FontAwesomeIcon icon={getSortIconByFieldName('createdAt')} />
              </th>
              <th>
                <Translate contentKey="seaportApp.message.sender">Sender</Translate> <FontAwesomeIcon icon="sort" />
              </th>
              <th />
              {/* Bạn có thể thêm các cột khác nếu cần */}
            </tr>
          </thead>
          <tbody>
            {messageList.map((message, i) => (
              <tr key={`message-${i}`}>
                <td>
                  <Button tag={Link} to={`/message/${message.id}`} color="link" size="sm">
                    {message.id}
                  </Button>
                </td>
                <td>{message.content}</td>
                <td>{message.createdAt ? <TextFormat type="date" value={message.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
                <td>{message.sender ? <Link to={`/room-member/${message.sender.id}`}>{message.sender.name}</Link> : ''}</td>
                {/* Thêm các thông tin khác nếu cần */}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="alert alert-warning">
          <Translate contentKey="seaportApp.message.home.notFound">No Messages found</Translate>
        </div>
      )}
    </div>
  );
};

export default MessageListTable;
