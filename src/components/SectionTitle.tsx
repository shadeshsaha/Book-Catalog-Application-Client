export type sectionTitle = {
  heading: string;
  subHeading: string|null;
};

const SectionTitle = ({ heading, subHeading }: sectionTitle) => {
  return (
    <div className="mx-auto text-center md:w-4/12 my-8">
      {subHeading && (
        <p className="text-yellow-600 mb-2">--- {subHeading} ---</p>
      )}
      <h3 className="text-3xl text-blue-600 font-bold uppercase border-y-4 py-4">
        {heading}
      </h3>
    </div>
  );
};

export default SectionTitle;
