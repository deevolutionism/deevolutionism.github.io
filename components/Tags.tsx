interface TagsProps {
  tags: []
}

export const Tags = ({tags}:TagsProps) => {
  return (
    <small>
      {tags.map( tag => <i key={tag}>{tag}</i>)}
    </small>
  )
}