import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";

const NUM_STARS = 5;
const MAX_POPULARITY = 100;

export interface StarPopularityProps {
  popularity: number;
  className?: string;
}

function StarPopularity({ popularity, className }: StarPopularityProps) {
  const numFillStars = Math.round((popularity * NUM_STARS) / MAX_POPULARITY);

  return (
    <Container className={className}>
      {Array.from({ length: NUM_STARS }).map((_, idx) => (
        <Star
          key={idx}
          icon={idx + 1 <= numFillStars ? faSolidStar : faRegularStar}
        />
      ))}
    </Container>
  );
}

export default StarPopularity;

const Container = styled.div`
  display: flex;
  gap: 5px;
`;

const Star = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.accent};
`;
