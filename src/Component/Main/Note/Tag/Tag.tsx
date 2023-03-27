import React, {FC} from 'react';
import Button from "../../../../common/Button/Button";
import s from "../Note.module.scss";
import DeleteIconMin from "../../../../assets/icons/DeleteIconMin";
import {TagType} from "../../../../reducers/noteReduser";


type TagPropsType = {
  tag: TagType
  onClickHandlerDeleteTag: (tagId: string) => void
}

const Tag:FC<TagPropsType>  = ({tag, onClickHandlerDeleteTag}) => {

  return (
    <React.Fragment>
      <li>
        {tag.tag}
        <Button className={s.button} onClick={() => onClickHandlerDeleteTag(tag.id)}>
          <DeleteIconMin/>
        </Button>
      </li>
    </React.Fragment>
  );
};

export default Tag;