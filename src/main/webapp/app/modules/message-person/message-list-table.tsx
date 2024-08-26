import React from 'react';
import { Table, Button } from 'reactstrap';
import { Translate, TextFormat, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { APP_DATE_FORMAT } from 'app/config/constants';

export const MessageListTable = ({ messageList, sort, getSortIconByFieldName, selectedRoomMemberId }) => {
  return (
    <div className="MessagePersonRoomMember-message-list-container">
      {messageList && messageList.length > 0 ? (
        <div className="MessageListTable">
          {messageList.map((message, i) => (
            <div key={`message-${i}`}>
              {message.person && message.person.user.id === selectedRoomMemberId ? (
                <div className="MessageListTable-each MessageListTable-right">
                  <div className="MessageListTable-2">
                    <div className="MessageListTable-content">{message.content}</div>
                    <div className="MessageListTable-createdAt">
                      {message.createdAt ? <TextFormat type="date" value={message.createdAt} format={APP_DATE_FORMAT} /> : null}
                    </div>
                  </div>
                  <div>
                    {message.person ? (
                      <div className="MessageListTable-image">
                        {message.person.avatarContentType ? (
                          <img src={`data:${message.person.avatarContentType};base64,${message.person.avatar}`} />
                        ) : null}
                      </div>
                    ) : (
                      <div className="MessageListTable-image">
                        {message.sender ? <Link to={`/room-member/${message.sender.id}`}>{message.sender.name}</Link> : ''}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="MessageListTable-each">
                  <div>
                    {message.person ? (
                      <div className="MessageListTable-image">
                        {message.person.avatarContentType ? (
                          <img src={`data:${message.person.avatarContentType};base64,${message.person.avatar}`} />
                        ) : null}
                      </div>
                    ) : (
                      <div className="MessageListTable-image">
                        {message.sender ? <Link to={`/room-member/${message.sender.id}`}>{message.sender.name}</Link> : ''}
                      </div>
                    )}
                  </div>
                  <div className="MessageListTable-2">
                    <div className="MessageListTable-content">{message.content}</div>
                    <div className="MessageListTable-createdAt">
                      {message.createdAt ? <TextFormat type="date" value={message.createdAt} format={APP_DATE_FORMAT} /> : null}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning">
          <Translate contentKey="seaportApp.message.home.notFound">No Messages found</Translate>
        </div>
      )}
    </div>
  );
};

export default MessageListTable;
