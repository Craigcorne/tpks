import React from 'react';
import {FooterContainer, FooterWrap, FooterLinksContainer,FooterLinksWrapper, FooterLinkItems, FooterLinkTitle, FooterLink, SocialMedia, SocialMediaWrap, SocialLogo, WebsiteRights, SocialIcons, SocialIconLink} from './FooterElements.js';
import { FaFacebook, FaInstagram, FaTelegram, FaWhatsapp} from 'react-icons/fa';
const Footer =() =>{
    return (
        <FooterContainer>
         <FooterWrap>
          <FooterLinksContainer>
              <FooterLinksWrapper>
                  <FooterLinkItems>
                      <FooterLinkTitle>About Us</FooterLinkTitle>
                          <FooterLink to="/"></FooterLink>
                          <FooterLink to="/"></FooterLink>
                          <FooterLink to="/"></FooterLink>
                          <FooterLink to="/"></FooterLink>
                          <FooterLink to="/"></FooterLink>
                      
                  </FooterLinkItems>
                  <FooterLinkItems>
                      <FooterLinkTitle>Contact Us</FooterLinkTitle>
                          <FooterLink to="/"></FooterLink>
                          <FooterLink to="/"></FooterLink>
                          <FooterLink to="/"></FooterLink>
                          <FooterLink to="/"></FooterLink>
                          <FooterLink to="/"></FooterLink>
                      
                  </FooterLinkItems>
              </FooterLinksWrapper>

          </FooterLinksContainer>
          <SocialMedia>
              <SocialMediaWrap>
                  <SocialLogo to='/'>
                      TeesPantsKicks
                  </SocialLogo>
                  <WebsiteRights>TeesPantsKicks © {new Date().getFullYear()}
                   All rights reserved</WebsiteRights>
                  <SocialIcons>
                      <SocialIconLink href="//" target="_blank"
                      arial-label="Facebook">
                          <FaFacebook/>
                      </SocialIconLink>
                      <SocialIconLink href="//" target="_blank"
                      arial-label="Instagram">
                          <FaInstagram/>
                      </SocialIconLink>
                      <SocialIconLink href="//" target="_blank"
                      arial-label="Telegram">
                          <FaTelegram/>
                      </SocialIconLink>
                      <SocialIconLink href="//" target="_blank"
                      arial-label="Whatsapp">
                          <FaWhatsapp/>
                      </SocialIconLink>
                  </SocialIcons>
              </SocialMediaWrap>
          </SocialMedia>
         </FooterWrap>
            
        </FooterContainer>
    );
}

export default Footer;