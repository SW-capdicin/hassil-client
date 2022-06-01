import React from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { getColor, getDateTime } from '@/utils';

const CafeReview = ({ reviewList }) => {
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
            <DateText>{getDateTime(review.createdAt).date}</DateText>
          </ReviewHeader>
          <ReviewText>{review.contents}</ReviewText>
          <Nickname>{review.User.nickname}</Nickname>
        </Review>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

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
