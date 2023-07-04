import styled from "styled-components";
import { Image } from "@/types/spotify";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import {
  ImgHTMLAttributes,
  PropsWithChildren,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

export interface FallbackImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  image: Image | string;
}

function FallbackImage({
  image,
  className,
  width,
  height,
  children,
  onError,
  ...imageProps
}: PropsWithChildren<FallbackImageProps>) {
  const [isFallbackActive, setIsFallbackActive] = useState(false);
  const src = typeof image === "string" ? image : image?.url;

  useEffect(() => {
    setIsFallbackActive(false);
  }, [src]);

  function handlerError(e: SyntheticEvent<HTMLImageElement>) {
    setIsFallbackActive(true);
    onError?.(e);
  }

  return (
    <ImageContainer className={className} style={{ width, height }}>
      {isFallbackActive ? (
        children
      ) : (
        <img
          className="image"
          src={src}
          onError={handlerError}
          {...imageProps}
        />
      )}
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  & > .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

type PredefinedIconProps = Omit<FontAwesomeIconProps, "icon">;

function PersonIcon(iconProps: PredefinedIconProps) {
  return <FontAwesomeIcon icon={faUser} size="2xl" {...iconProps} />;
}

function NoteIcon(iconProps: PredefinedIconProps) {
  return <FontAwesomeIcon icon={faMusic} size="2xl" {...iconProps} />;
}

export default Object.assign(FallbackImage, {
  Icon: FontAwesomeIcon,
  PersonIcon,
  NoteIcon,
});
