import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GoSearch } from 'react-icons/go';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import emptyimg from '@/img/emptyimg.png';
import { getStudyCafesByRegion } from '@/api';

const StudyRoomReservation = () => {
  const location = useLocation();
  console.log(location.state);
  const studyId = location.state.studyId;
  console.log(studyId);
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [area, setArea] = useState('지역을 선택해주세요.');
  const [locationGu, setLocationGu] = useState([]);

  const [studyCafeList, setStudyCafeList] = useState([]);
  const navigate = useNavigate();

  const getSearchStudyCafe = async () => {
    if (search != '') {
      // studyCafe 찾는 api 필요
      // const responseSearch = await searchStudyCafe({ keyword: search });
      // await setSearchList(responseSearch);
    }
  };
  const handleSearchChange = (event) => {
    const studyCafeName = event.target.value;
    setSearch(studyCafeName);
  };
  // const getSearchStudyCafeList = () => {
  //   searchList.map((item, idx) => (
  //     <TabContent key={idx}>
  //       <Link to={{ pathname: PATH_STUDYCAFE_DETAIL + `/${item.id}` }}>
  //         <Img src={item.src ? `${item.src}` : emptyimg} />
  //         <TextContainer>
  //           <Text>{item.name}</Text>
  //         </TextContainer>
  //       </Link>
  //     </TabContent>
  //   ));
  // };

  useEffect(() => {
    getStudyCafeListByGu();
  }, []);

  const handleLocation = (event) => {
    setArea(event.target.innerHTML.split('(')[0].trim());
  };
  const getStudyCafeListByGu = async () => {
    const responseData = await getStudyCafesByRegion();
    setLocationGu(responseData);
  };
  const resetArea = () => {
    setArea('지역을 선택해주세요.');
  };
  const goStudyRoomRecommendation = () => {
    // navigate()
  };
  const goStudyCafeDetail = (studyCafeId) => {
    console.log(studyCafeId);
    navigate(`/cafes/${studyCafeId}`, {
      state: { studyId: studyId },
    });
  };
  return (
    <Container>
      <SearchContainer>
        <Search
          type="search"
          name="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="스터디 카페 이름 검색"
        />
        <CuGoSearch />
      </SearchContainer>
      <LocationContainer>
        <SiLocationContainer>
          <SiLocation>지역</SiLocation>
          <Label onClick={resetArea}>{area}</Label>
        </SiLocationContainer>
        {area === '지역을 선택해주세요.'
          ? locationGu.map((Gu, idx) => (
              <Location key={idx} onClick={handleLocation}>
                {`${Gu.region2DepthName} (${Gu.studyCafes.length})`}
              </Location>
            ))
          : locationGu
              .filter((item) => item.region2DepthName == area)[0]
              .studyCafes.map((item, idx) => (
                <StudyCafeContainer
                  key={idx}
                  onClick={() => goStudyCafeDetail(item.id)}
                >
                  <StudyCafeImg
                    src={
                      item.StudyCafeImages.length !== 0
                        ? `${item.StudyCafeImages[0].src}`
                        : emptyimg
                    }
                  />
                  <StudyCafe>{item.name}</StudyCafe>
                </StudyCafeContainer>
              ))}
      </LocationContainer>
      {area === '지역을 선택해주세요.' && (
        <FixedDiv>
          <CreateBtn onClick={goStudyRoomRecommendation}>
            <BtnText>스터디 룸 추천해주세요!</BtnText>
          </CreateBtn>
        </FixedDiv>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 35rem;
`;
const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const SiLocationContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 3rem;
  /* justify-content: center; */
  border-color: ${({ theme }) => theme.color.gray};
  align-items: center;
  border-width: 1px;
  border-style: solid none;
`;
const SiLocation = styled.div`
  display: flex;
  width: 30%;
  height: 3rem;
  border-width: 1px;
  border-style: none solid none none;
  border-color: ${({ theme }) => theme.color.gray};
  justify-content: center;
  align-items: center;
`;
const Label = styled.div`
  display: flex;
  width: 70%;
  height: 3rem;
  justify-content: center;
  align-items: center;
  color: ${({ children }) =>
    children !== '지역을 선택해주세요.'
      ? ({ theme }) => theme.color.black
      : ({ theme }) => theme.color.gray};
`;
const Location = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 2rem;
  align-items: center;
  height: 3rem;
  border-width: 1px;
  border-style: none none solid;
  border-color: ${({ theme }) => theme.color.gray};
`;

const StudyCafeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 35vh;
  border-width: 1px;
  border-style: none none solid;
  border-color: ${({ theme }) => theme.color.gray};
`;

const StudyCafe = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 2.5rem;
  align-items: center;
  /* height: 3rem; */
`;
const StudyCafeImg = styled.img`
  width: 80%;
  height: 70%;
  margin: 1rem 0rem;
  border-radius: 10px;
  align-self: center;
  object-fit: cover;
`;

const FixedDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.color.gray};
`;

const CreateBtn = styled.button`
  background-color: ${({ theme }) => theme.color.blue};
  border: 0;
  outline: 0;
  width: 14rem;
  height: 2.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 20px;
  cursor: pointer;
  margin: auto;
`;
const BtnText = styled.div`
  color: ${({ theme }) => theme.color.white};
  font-style: normal;
  font-weight: 700;
  font-size: larger;
`;
export default StudyRoomReservation;
