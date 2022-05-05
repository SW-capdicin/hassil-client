import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_STUDY_CREATE, PATH_STUDY_DETAIL } from '@/constants';
import styled from 'styled-components';
import studyimg from '@/img/study.png';
import emptyimg from '@/img/emptyimg.png';
import { GoSearch } from 'react-icons/go';
import { IoMdAddCircle } from 'react-icons/io';
import { getStudyList } from '@/api';

const Date = 2;
const Category = ['전체', '코딩', '중국어', '영어'];

const Home = () => {
  const navigate = useNavigate();
  const [studies, setStudies] = useState([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('전체');

  const loadStudies = async _ => {
    const data = await getStudyList();
    console.log(data);
    setStudies(_ => data);
  }
  useEffect(_ => {
    return loadStudies;
  }, []);

  const handleChange = (e) => {
    const studyName = e.target.value;
    setSearch(studyName);
  };

  const btnClickCreateStudy = (e) => {
    navigate(PATH_STUDY_CREATE);
  }

  const btnClickDetailStudy = (id, e) => {
    // 이부분부터 작업
    navigate(`${PATH_STUDY_DETAIL}/${id}`);
  }

  const tabClickHandler = (item) => {
    setActiveTab(item);
  };
  return (
    <Container>
      <SearchContainer>
        <Search
          type="search"
          name="search"
          value={search}
          onChange={handleChange}
          placeholder="스터디 이름 검색"
        ></Search>
        <CuGoSearch />
      </SearchContainer>
      <TabContainer>
        <TabTitle>
          {Category.map((category, index) => (
            <StudyList
              key={index}
              category={category}
              activeTab={activeTab}
              onClick={() => tabClickHandler(category)}
            >
              {category}
            </StudyList>
          ))}
        </TabTitle>
        <Line />
        <TabContentContainer>
          {studies.filter((val) => {
            if (
              search != '' &&
              val.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return val;
            }
          }).map((data, index) => {
            return (
              <TabContent key={index} onClick={e => btnClickDetailStudy(data.id, e)}>
                <TextContainer>
                  <Text>{data.name}</Text>
                  <DateText>{Date}일뒤 시작</DateText>
                </TextContainer>
              </TabContent>
            );
          })}
          {search == '' &&
            (activeTab === '전체'
              ? studies.map((item, index) => {
                  return (
                    <TabContent key={index} onClick={e => btnClickDetailStudy(item.id, e)}>
                      {item.src ? (
                        <Img src={`${item.src}`} />
                      ) : (
                        <Img src={emptyimg} />
                      )}
                      <TextContainer>
                        <Text>{item.name}</Text>
                        <DateText>{Date}일뒤 시작</DateText>
                      </TextContainer>
                    </TabContent>
                  );
                })
              : studies.filter((item) => item.category == activeTab).map(
                  (item, index) => {
                    return (
                      <TabContent key={index} onClick={e => btnClickDetailStudy(item.id, e)}>
                        <Img src={`${item.src}`} />
                        <TextContainer>
                          <Text>{item.name}</Text>
                          <DateText>{Date}일뒤 시작</DateText>
                        </TextContainer>
                      </TabContent>
                    );
                  },
                ))}
          <CuIoMdAddCircle onClick={btnClickCreateStudy} />
        </TabContentContainer>
      </TabContainer>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 35rem;
  width: 22rem;
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
  color: ${({ theme }) => theme.color.gray};
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
const StudyList = styled.li`
  list-style: none;
  width: 80%;
  text-align: center;
  align-self: center;
  font-size: medium;
  border-bottom: ${(props) =>
    props.category === props.activeTab ? `solid` : `none`};
  border-bottom-color: ${(props) => {
    if (props.category === props.activeTab) {
      ({ theme }) => theme.color.blue;
    }
  }};
  color: ${(props) =>
    props.category === props.activeTab
      ? ({ theme }) => theme.color.blue
      : ({ theme }) => theme.color.black};
`;
const TabContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;
const TabContent = styled.div`
  width: 50%;
  margin-bottom: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TextContainer = styled.div`
  width: 7rem;
  display: flex;
  flex-direction: column;
`;
const Text = styled.div`
  font-size: medium;
  position: relative;
  left: 5%;
`;
const DateText = styled.div`
  background-color: ${({ theme }) => theme.color.gray};
  color: ${({ theme }) => theme.color.black};
  border-radius: 10px;
  font-size: 5px;
  width: 50%;
  left: 5%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const Img = styled.img`
  width: 7rem;
  height: 7rem;
  border: 0;
  outline: 0;
  border-radius: 10px;
`;
const CuIoMdAddCircle = styled(IoMdAddCircle)`
  position: sticky;
  color: ${({ theme }) => theme.color.blue};
  width: 3rem;
  height: 3rem;
  left: 200rem;
  bottom: 15%;
`;
export default Home;
