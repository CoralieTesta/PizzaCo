import { Fragment } from "react";
import Media from "react-media";
import { NavALarge } from "../NavALarge/NavALarge";
import { NavASmall } from "../NavASmall/NavASmall";

export default function Nav() {
    
    return(
        <Media queries={{
            small: "(max-width: 599px)",
            medium_large: "(min-width: 600px)"
          }}>
            {matches => (
              <Fragment>
                {matches.medium_large && 
                    <NavALarge/>
                }
                {matches.small && 
                    <NavASmall/>
                }
                </Fragment>
            )}
        </Media>
    )
}