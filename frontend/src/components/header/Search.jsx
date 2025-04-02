import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Heading from "../heading/Heading";

const Search = ({ open, onClose }) => {
  return (
    <StyledSearch $open={open}>
      <StyledHeader>
        <StyledLogo onClick={onClose}>
          <Link to={"/"}>
            <img
              src="https://wonder-theme-fashion.myshopify.com/cdn/shop/files/logo-couture-black.svg?v=1708090539&width=280"
              alt=""
            />
          </Link>
        </StyledLogo>
        <StyledCloseSearch onClick={onClose}>
          <XMarkIcon width={30} height={30} />
        </StyledCloseSearch>
      </StyledHeader>
      <StyledMainContent>
        <StyledSearchInputForm>
          <StyledSearchInput name="search" placeholder="البحث حسب اسم المنتج" />
          <StyledSearchBtn>
            <button>
              <MagnifyingGlassIcon width={25} height={25} />
            </button>
          </StyledSearchBtn>
        </StyledSearchInputForm>
        <StyledDefaultResult>
          <Heading
            weight={500}
            size={"xl"}
            title={"أخـر  ماغنـت أم كلثـوم 💫"}
          />
          <StyledDefaultResultList>
            {[...Array(4)].map((_, index) => (
              <StyledDefaultResultListCard key={index}>
                <Link to={"/collections/prd"}>
                  <StyledDefImage>
                    <img
                      src="https://ma.bouchrafilalilahlou.com/cdn/shop/files/djellaba_femme_dor.jpg?crop=region&crop_height=1200&crop_left=120&crop_top=0&crop_width=960&v=1742610117&width=1470"
                      alt=""
                    />
                  </StyledDefImage>
                  <StyledProductTitle>
                    <h4>قفطان مغربي فخم لايان مرصع بجواهر سواروفسكي وزهور</h4>
                  </StyledProductTitle>
                </Link>
              </StyledDefaultResultListCard>
            ))}
          </StyledDefaultResultList>
        </StyledDefaultResult>
      </StyledMainContent>
    </StyledSearch>
  );
};

export default Search;

const StyledSearch = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100svh;
  background-color: var(--white);
  z-index: 2345678456;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  transition: opacity 0.2s ease-in, visibility 0.2s ease-in;
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
`;

const StyledHeader = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  @media (max-width: 768px) {
    justify-content: end;
    height: 7rem;
  }
`;

const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 200px;
  }
  @media (max-width: 768px) {
    justify-content: start;
    img {
      width: 130px;
    }
  }
`;

const StyledCloseSearch = styled.div`
  position: absolute;
  top: 2.2rem;
  right: 2.2rem;
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 768px) {
    top: 1.2rem;
    right: 1rem;
  }
  &:hover {
    background-color: var(--neutral-200);
  }
`;

const StyledMainContent = styled.div`
  width: 100%;
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  /* direction: ltr; */
`;
const StyledSearchInputForm = styled.div`
  width: 90%;
  max-width: 60rem;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  border: 1px solid var(--neutral-300);
`;
const StyledSearchInput = styled.input`
  grid-column: span 10 / span 10;
  width: 100%;
  height: 5rem;
  background-color: var(--neutral-100);
  outline: none;
  padding: 0 2rem;
  color: var(--neutral-800);
  font-size: var(--text-md);
`;
const StyledSearchBtn = styled.div`
  grid-column: span 2 / span 2;
  button {
    width: 100%;
    height: 100%;
    background-color: var(--neutral-800);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--white);
    cursor: pointer;
    border: none;
    outline: none;
    &:hover {
      background-color: var(--neutral-900);
    }
  }
`;
const StyledDefaultResult = styled.div`
  width: 90%;
  max-width: 100rem;
  padding: 2rem 0;
  `;
const StyledDefaultResultList = styled.ul`
height: 65vh;
overflow: auto;
  padding-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 3rem;
`;
const StyledDefImage = styled.div`
  height: 30rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    transition: all 0.3s ease;
  }
`;
const StyledProductTitle = styled.div`
  h4 {
    font-size: var(--text-sm);
    color: var(--neutral-500);
    font-weight: 500;
  }
`;
const StyledDefaultResultListCard = styled.div`
  a {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  &:hover ${StyledDefImage} img {
    transform: scale(1.03);
  }
  &:hover ${StyledProductTitle} h4 {
    color: var(--neutral-800);
  }
`;
// const StyledSearchInputForm = styled.div`

// `;
