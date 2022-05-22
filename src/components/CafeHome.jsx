import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH_STUDYCAFE_CREATE, PATH_STUDY_DETAIL } from '@/constants';
import styled from 'styled-components';
import { IoMdAddCircle } from 'react-icons/io';
import emptyimg from '@/img/emptyimg.png';
import { getColor, separatorMoney } from '@/utils';

const UserHome = () => {
  const [cafeList, setCafeList] = useState([
    {
      name: '아주대 공간샘 카페',
      src: 'http://www.lightingnews.net/images/theme/cafe_01.png',
    },
    {
      name: '아주대 공간샘 카페',
      src: 'http://www.lightingnews.net/images/theme/cafe_01.png',
    },
    {
      name: '아주대 공간샘 카페',
      src: 'http://www.lightingnews.net/images/theme/cafe_01.png',
    },
    {
      name: '아주대 공간샘 카페',
      src: 'http://www.lightingnews.net/images/theme/cafe_01.png',
    },
    {
      name: '아주대 공간샘 카페',
      src: 'http://www.lightingnews.net/images/theme/cafe_01.png',
    },
    {
      name: '아주대 공간샘 카페',
      src: 'http://www.lightingnews.net/images/theme/cafe_01.png',
    },
  ]);
  const [reservationList, setReservationList] = useState([
    { name: '아주대 공간샘 A룸', price: 16000, date: '2022.04.13 20:00~22:00' },
    { name: '아주대 공간샘 A룸', price: 16000, date: '2022.04.13 20:00~22:00' },
    { name: '아주대 공간샘 A룸', price: 16000, date: '2022.04.13 20:00~22:00' },
  ]);
  const [currentTab, setCurrentTab] = useState(0);

  const tabClickHandler = (categoryId) => {
    setCurrentTab(categoryId);
  };

  return (
    <Container>
      <TabContainer>
        <TabTitle>
          {[
            { id: 0, name: '스터디 카페' },
            { id: 1, name: '예약 현황' },
          ].map((category) => (
            <Category
              key={category.id}
              category={category.id}
              activeTab={currentTab}
              onClick={() => tabClickHandler(category.id)}
            >
              {category.name}
            </Category>
          ))}
        </TabTitle>
        <Line />
      </TabContainer>
      {currentTab === 0 ? (
        <TabContentContainer>
          {cafeList.map((item, idx) => (
            <TabContent key={idx}>
              <Link to={{ pathname: PATH_STUDY_DETAIL + `/${item.id}` }}>
                <Img src={item.src ? `${item.src}` : emptyimg} />
                <TextContainer>
                  <Text>{item.name}</Text>
                </TextContainer>
              </Link>
            </TabContent>
          ))}
        </TabContentContainer>
      ) : (
        <ReservationContainer>
          {reservationList.map((item, idx) => (
            <ReservationContent key={idx}>
              <ReservationInfo>
                <ReservationData>{item.date}</ReservationData>
                <ReservationRoomName>{item.name}</ReservationRoomName>
                <ReservationPrice>
                  결제액 {separatorMoney(item.price)}원
                </ReservationPrice>
              </ReservationInfo>
              <ReservationReject>거절</ReservationReject>
            </ReservationContent>
          ))}
        </ReservationContainer>
      )}

      <Link to={PATH_STUDYCAFE_CREATE}>
        <CuIoMdAddCircle />
      </Link>
    </Container>
  );
};

const ReservationContainer = styled.div``;

const ReservationInfo = styled.div``;

const ReservationContent = styled.div`
  padding: 1rem 0rem 1rem 0rem;
  border: 1px solid gray;
  border-radius: 15px;
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ReservationData = styled.div`
  font-size: 1rem;
`;

const ReservationRoomName = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 1.2rem;
`;

const ReservationReject = styled.button`
  background-color: ${getColor('gray')};
  border: none;
  border-radius: 15px;
  font-size: 1rem;
  padding: 0.7rem 0.8rem 0.7rem 0.8rem;
`;

const ReservationPrice = styled.div`
  font-size: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 35rem;
  width: 80%;
`;

const TabContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
`;
const TabTitle = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 2rem;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const Line = styled.hr`
  width: 100%;
  color: ${getColor('gray')};
  margin-bottom: 1rem;
`;
const Category = styled.li`
  list-style: none;
  width: 80%;
  text-align: center;
  align-self: center;
  font-size: medium;
  border-bottom-color: ${(props) => {
    if (props.category === props.activeTab) {
      getColor('blue');
    }
  }};
  color: ${(props) =>
    props.category === props.activeTab ? getColor('blue') : getColor('black')};
`;

const CuIoMdAddCircle = styled(IoMdAddCircle)`
  position: fixed;
  width: 4rem;
  height: 4rem;
  bottom: 5%;
  right: 5%;
  color: ${getColor('blue')};
`;

const TabContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  width: 100%;
  height: 9rem;
  border-radius: 10px;
  align-self: center;
  object-fit: cover;
`;

const Text = styled.span`
  font-size: 1rem;
  width: 100%;
  margin-top: 4px;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TabContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  a {
    width: 95%;
    display: flex;
    flex-direction: column;
    align-self: center;
  }
  a:link {
    text-decoration: none;
  }
`;

export default UserHome;
