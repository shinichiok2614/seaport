import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, ValidatedField, ValidatedForm, ValidatedBlobField, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import {
  getEntities as getAllRoomMember,
  deleteEntity as deleteRoomMember,
  getEntitiesByCurrentUser,
} from 'app/entities/room-member/room-member.reducer';
import {
  createEntity as createMessage,
  getEntities as getAllMessage,
  getEntitiesByRoom as getAllMessageByRoom,
} from 'app/entities/message/message.reducer';
import { createEntity as createRoom } from 'app/entities/room/room.reducer';
import dayjs from 'dayjs';
import { convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import './MessagePersonRoomMember.css';
import RoomMemberTable from './RoomMemberTable';
import MessageListTable from './message-list-table';

export const MessagePersonRoomMember = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const roomMemberList = useAppSelector(state => state.roomMember.entities);
  const loading = useAppSelector(state => state.roomMember.loading);
  const currentUser = useAppSelector(state => state.authentication.account);

  const getAllEntities = () => {
    dispatch(getEntitiesByCurrentUser());
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

  ////////////////////////////

  const messageList = useAppSelector(state => state.message.entities);
  const loadingmessageList = useAppSelector(state => state.message.loading);
  const messageupdateSuccess = useAppSelector(state => state.message.updateSuccess);

  ///////////////////////////

  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [selectedRoomMemberId, setSelectedRoomMemberId] = useState<string>('');
  const [selectedRoomMember, setSelectedRoomMember] = useState(null);
  useEffect(() => {
    // if (selectedRoomId) {
    //   dispatch(getAllMessageByRoom(selectedRoomId));
    // }
    socketRef.current = new WebSocket('ws://localhost:8000');
    //lich su chat
    socketRef.current.onmessage = event => {
      const { room: receivedRoom, text, username } = JSON.parse(event.data);
      if (receivedRoom === room) {
        setMessages(prevMessages => [...prevMessages, { text, username }]);
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [selectedRoomId, selectedRoomMemberId]);

  useEffect(() => {
    if (selectedRoomId) {
      dispatch(getAllMessageByRoom(selectedRoomId));
    }
  }, [selectedRoomId, selectedRoomMemberId, messageupdateSuccess]);

  const handleRoomMemberClick = (roomMember, roommemberId, roomId) => {
    setSelectedRoomMember(roomMember);
    setSelectedRoomMemberId(roommemberId);
    setUsername(roommemberId);
    setSelectedRoomId(roomId);
    setRoom(roomId);
  };
  const joinRoom = () => {
    if (socketRef.current && room && username) {
      socketRef.current.send(JSON.stringify({ type: 'join', room, username }));
      setJoined(true);
    }
  };
  const sendMessage = () => {
    if (socketRef.current && inputValue && joined) {
      socketRef.current.send(JSON.stringify({ type: 'message', room, text: inputValue, username }));
      setInputValue('');
      saveEntity();
    }
  };
  const saveEntity = () => {
    const entity = {
      content: inputValue,
      createdAt: dayjs(),
      isActive: true,
      sender: selectedRoomMember,
      message: selectedRoomMember.room,
    };
    dispatch(createMessage(entity));
  };
  ////////////////////////////////////
  const [messages, setMessages] = useState<{ text: string; username: string }[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [joined, setJoined] = useState<boolean>(false);
  const socketRef = useRef<WebSocket | null>(null);
  ////////////////////////////////////
  const saveRoomPrivate = () => {
    const entity = {
      name: `RoomPrivate-${dayjs()}`,
      isPrivate: true,
      createdAt: dayjs(),
    };
    dispatch(createRoom(entity));
  };

  const deleteRoomMember = () => {
    // dispatch(deleteRoomMember(selectedRoomMemberId));
  };
  return (
    <div className="MessagePersonRoomMember">
      <div className="MessagePersonRoomMember1">
        <RoomMemberTable
          roomMemberList={roomMemberList}
          loading={loading}
          sort={sort}
          getSortIconByFieldName={getSortIconByFieldName}
          handleRoomMemberClick={handleRoomMemberClick}
          joinRoom={joinRoom}
          saveRoomPrivate={saveRoomPrivate}
        />
        <div className="MessagePersonRoomMember1-messagelist-body">
          <MessageListTable
            messageList={messageList}
            sort={sort}
            getSortIconByFieldName={getSortIconByFieldName}
            selectedRoomMemberId={selectedRoomMemberId}
          />
          <div>
            <div>
              {messages.map((message, index) => (
                <div key={index}>
                  <strong>{message.username}:</strong> {message.text}
                </div>
              ))}
            </div>
            <div className="MessagePersonRoomMember-message"></div>
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') sendMessage();
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePersonRoomMember;
