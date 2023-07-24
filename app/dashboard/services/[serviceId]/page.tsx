import supabase from '@/utils/supabase'
import { Service } from '@/types/service'
import { PrimaryButton } from '@/components/PrimaryButton'

const getContent = async (serviceId: number): Promise<Service> => {
  const { data, error } = await supabase.from('services').select('*').eq('id', serviceId);
  if (error) {
    console.log(error);
    return {
      id: null,
      title: null,
      description: null,
      photoUrl: null,
      content: null,
    };
  }
  return {
    id: data[0]['id'],
    title: data[0]['title'],
    description: data[0]['description'],
    photoUrl: data[0]['photo_url'],
    content: data[0]['content'],
  }
};

const ServiceDetail = async ({ params }: { params: { serviceId: number } }) => {
  const curService: Service = await getContent(params.serviceId);
  return <>
    <p className='text-center text-bannerTextColor text-adTitleBigSize md:text-adTitleSmallSize sm:text-adTitleSmallSize font-arial font-[700]'>
      {curService.title}
    </p>
    <div className='border border-solid border-[#D9D9D9] mt-[90px] lg:mt-[50px] md:mt-[50px] sm:mt-[50px] mx-[5px]' />
    <div className='mt-[25px]'>
      <img
        alt='aboutus'
        src='/images/aboutus.png'
        className='w-full mt-[50px]'
      />
      <div className='text-left mt-[50px]'>
        <span className='text-adDescBigSize md:text-adDescSmallSize sm:text-adDescSmallSize text-bannerTextColor font-arial font-[300]'>
          {curService.content?.header + ":"}
        </span>
      </div>
      <div>
        {
          curService.content?.content.map((subService, idx) => {
            return <div key={`seniorevents_paragraph_${idx}`} className='mt-[50px] text-justify'>
              <span className='text-adDescBigSize md:text-adDescSmallSize sm:text-adDescSmallSize text-bannerTextColor font-arial font-[700]'>
                {`${subService.subtitle}: `}
              </span>
              <br className='hidden md:block sm:block' />
              <span className='text-adDescBigSize md:text-adDescSmallSize sm:text-adDescSmallSize text-bannerTextColor font-arial font-[300]'>
                {subService.description}
              </span>
            </div>
          })
        }
        <div className='mt-[50px] text-justify'>
          <span className='text-adDescBigSize md:text-adDescSmallSize sm:text-adDescSmallSize text-bannerTextColor font-arial font-[300]'>
            {curService.content?.footer}
          </span>
        </div>
      </div>
      <div className='text-center mt-[50px]'>
        <PrimaryButton href='/apply'>Apply for Care</PrimaryButton>
      </div>
    </div>
  </>
};

export default ServiceDetail;