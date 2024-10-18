import { BackIcon } from "@/components/icons/BackIcon";
import styled from "styled-components";

export function BackButton({ onClick }: { onClick(): void }) {
  return (
    <BackButtonLayout onClick={onClick}>
      <BackIcon />
    </BackButtonLayout>
  );
}

const BackButtonLayout = styled.button`
  border: none;
  background-color: transparent;
`;
