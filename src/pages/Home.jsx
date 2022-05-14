import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PATH_STUDY_CREATE,
  PATH_STUDY_DETAIL,
  TYPE_STUDY_CATEGORY,
} from '@/constants';
import styled from 'styled-components';
import { GoSearch } from 'react-icons/go';
import { IoMdAddCircle } from 'react-icons/io';
import { getStudyList } from '@/api';
import emptyimg from '@/img/emptyimg.png';
import { getColor } from '@/utils';

const Home = () => {
  const [studyList, setStudyList] = useState([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const loadStudies = async () => {
    const now = new Date();
    const data = await getStudyList();
    setStudyList(() => data.filter(a => new Date(a.startDate) > now));
  };

  useEffect(() => {
    loadStudies();
  }, []);

  const handleChange = (e) => {
    const studyName = e.target.value;
    setSearch(studyName);
  };

  const tabClickHandler = (categoryId) => {
    setActiveTab(categoryId);
  };

  const calcDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diffDate = d.getTime() - now.getTime();
    return Math.ceil(Math.abs(diffDate / (1000 * 3600 * 24)));
  }

  const getStudyListByCurrentTab = () =>
    activeTab
      ? studyList
          .filter((item) => item.categoryId == activeTab)
          .map((item, idx) => (
            <TabContent key={idx}>
              <Link to={{ pathname: PATH_STUDY_DETAIL + `/${item.id}` }}>
                <Img src={item.src ? `${item.src}` : emptyimg} />
                <TextContainer>
                  <Text>{item.name}</Text>
                  <DateText>{calcDate(item.startDate)}일뒤 시작</DateText>
                </TextContainer>
              </Link>
            </TabContent>
          ))
      : studyList.map((item, idx) => (
          <TabContent key={idx}>
            <Link to={{ pathname: PATH_STUDY_DETAIL + `/${item.id}` }}>
              <Img src={item.src ? `${item.src}` : emptyimg} />
              <TextContainer>
                <Text>{item.name}</Text>
                <DateText>{calcDate(item.startDate)}일뒤 시작</DateText>
              </TextContainer>
            </Link>
          </TabContent>
        ));

  return (
    <Container>
      <SearchContainer>
        <Search
          type="search"
          name="search"
          value={search}
          onChange={handleChange}
          placeholder="스터디 이름 검색"
        />
        <CuGoSearch />
      </SearchContainer>

      <TabContainer>
        <TabTitle>
          {[{ id: 0, name: '전체' }, ...TYPE_STUDY_CATEGORY].map((category) => (
            <Category
              key={category.id}
              category={category.id}
              activeTab={activeTab}
              onClick={() => tabClickHandler(category.id)}
            >
              {category.name}
            </Category>
          ))}
        </TabTitle>
        <Line />
        <TabContentContainer>{getStudyListByCurrentTab()}</TabContentContainer>
      </TabContainer>
      <Link to={PATH_STUDY_CREATE}>
        <CuIoMdAddCircle />
      </Link>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 35rem;
  width: 80%;
`;
const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const Search = styled.input`
  width: 80%;
  height: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  align-self: center;
  text-align: center;
`;
const CuGoSearch = styled(GoSearch)`
  position: relative;
  width: 1rem;
  height: 2rem;
  left: -2rem;
`;
const TabContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 100%;
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

const TabContent = styled.div`
  width: 50%;
  height: 95%;
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
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
`;

const DateText = styled.div`
  width: 60%;
  height: 1.2rem;
  font-size: 0.8rem;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${getColor('black')};
  background-color: ${getColor('dimgray')};
`;

export default Home;
