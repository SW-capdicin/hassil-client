import React from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { getColor } from '@/utils';

const CafeReview = () => {
  const reviewList = [
    {
      rating: 5,
      date: '2022-05-31',
      review:
        '너무 좋아요 또 오고 싶어요 사장님이 너무 친절해요 그리고 여기 커피가 맛있어요 아메리카노 곡 시켜드세요',
      nickname: 'Brown',
    },
    {
      rating: 5,
      date: '2022-05-31',
      review:
        '너무 좋아요 또 오고 싶어요 사장님이 너무 친절해요 그리고 여기 커피가 맛있어요 아메리카노 곡 시켜드세요',
      nickname: 'Brown',
    },
    {
      rating: 5,
      date: '2022-05-31',
      review:
        '너무 좋아요 또 오고 싶어요 사장님이 너무 친절해요 그리고 여기 커피가 맛있어요 아메리카노 곡 시켜드세요',
      nickname: 'Brown',
    },
    {
      rating: 5,
      date: '2022-05-31',
      review:
        '너무 좋아요 또 오고 싶어요 사장님이 너무 친절해요 그리고 여기 커피가 맛있어요 아메리카노 곡 시켜드세요',
      nickname: 'Brown',
    },
    {
      rating: 4.5,
      date: '2022-05-31',
      review:
        '너무 좋아요 또 오고 싶어요 사장님이 너무 친절해요 그리고 여기 커피가 맛있어요 아메리카노 곡 시켜드세요',
      nickname: 'Brown',
    },
  ];

  return (
    <Container>
      {reviewList.map((review, idx) => (
        <Review key={idx}>
          <ReviewHeader>
            <StarRatings
              rating={review.rating}
              starHoverColor="#FFD460"
              starRatedColor="#FFD460"
              numberOfStars={5}
              starSpacing={'0'}
              name="rating"
              starDimension={'25'}
            />
            <DateText>{review.date}</DateText>
          </ReviewHeader>
          <ReviewText>{review.review}</ReviewText>
          <Nickname>{review.nickname}</Nickname>
        </Review>
      ))}
    </Container>
  );
};

const Container = styled.div``;

const ReviewText = styled.div`
  font-size: smaller;
  margin: 0.3rem 0 0.3rem 0;
`;

const Nickname = styled.div`
  align-self: end;
`;

const ReviewHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DateText = styled.div`
  color: ${getColor('gray')};
`;

const Review = styled.div`
  display: flex;
  flex-direction: column;
  border-style: solid none solid none;
  border-color: ${getColor('gray')};
  border-width: 1px;
  padding: 0.7rem 0 0.7rem 0;
`;

export default CafeReview;
