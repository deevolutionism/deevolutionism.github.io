import {Tag} from "./Tag"
interface TagsProps {
  tags: []
}

export const Tags = ({tags}:TagsProps) => {
  return (
    <small>
      {tags.map( tag => <Tag key={tag} tag={tag} />)}
    </small>
  )
}