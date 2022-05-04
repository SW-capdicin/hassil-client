// import theme from '@/style/Theme';
import React, { useState } from 'react';
import styled from 'styled-components';
import studyimg from '@/img/study.png';
import emptyimg from '@/img/emptyimg.png';
import { GoSearch } from 'react-icons/go';
import { IoMdAddCircle } from 'react-icons/io';
const Date = 2;
const Example = [
  {
    name: '아주대 모각코',
    img: studyimg,
    category: '코딩',
  },
  {
    name: '아주대 랭스',
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    category: '코딩',
  },
  {
    name: '투썸',
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    category: '중국어',
  },
  {
    name: '스벅',
    img: '',
    category: '영어',
  },
  {
    name: '유메야',
    img: '',
    category: '영어',
  },
  {
    name: '아주대 키뮤',
    img: studyimg,
    category: '코딩',
  },
  {
    name: '아주대 맨즈',
    img: studyimg,
    category: '코딩',
  },
  {
    name: '아주대 우맨즈',
    img: studyimg,
    category: '코딩',
  },
  {
    name: '아주대 카페3',
    img: studyimg,
    category: '코딩',
  },
  {
    name: '카페4',
    img: studyimg,
    category: '코딩',
  },
  {
    name: '카페5',
    img: studyimg,
    category: '코딩',
  },
  {
    name: '아주대 골목커피',
    img: studyimg,
    category: '코딩',
  },
];
const Category = ['전체', '코딩', '중국어', '영어'];

const Main = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('전체');
  const handleChange = (e) => {
    const studyName = e.target.value;
    setSearch(studyName);
  };

  const tabClickHandler = (item) => {
    console.log('tabClick : ', item);
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
          {Example.filter((val) => {
            if (
              search != '' &&
              val.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return val;
            }
          }).map((data, index) => {
            return (
              <TabContent key={index}>
                <TextContainer>
                  <Text>{data.name}</Text>
                  <DateText>{Date}일뒤 시작</DateText>
                </TextContainer>
              </TabContent>
            );
          })}
          {search == '' &&
            (activeTab === '전체'
              ? Example.map((item, index) => {
                  return (
                    <TabContent key={index}>
                      {item.img ? (
                        <Img src={`${item.img}`} />
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
              : Example.filter((item) => item.category == activeTab).map(
                  (item, index) => {
                    return (
                      <TabContent key={index}>
                        <Img src={`${item.img}`} />
                        <TextContainer>
                          <Text>{item.name}</Text>
                          <DateText>{Date}일뒤 시작</DateText>
                        </TextContainer>
                      </TabContent>
                    );
                  },
                ))}
          <CuIoMdAddCircle />
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
  /* overflow: scroll; */
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
  color: ${(props) => (props.category === props.activeTab ? `blue` : `black`)};
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
  left: 150rem;
  bottom: 40%;

  /* right: 50%; */
`;
export default Main;
