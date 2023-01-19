import LogoImg from "../../assets/postlylogo.svg";

import {
  Container,
  Title
} from './styles'

export default function Logo() {
  return (
    <Container>
      <LogoImg />
      <Title>Postly</Title>
    </Container>
  )
}
