/**
 * A reusable button component that supports different button styles.
 *
 * @param name - The text to display on the button.
 * @param onClick - An optional click handler for the button.
 * @param type - The type of button to render, can be "primaryBtn", "secondaryBtn", or "borderedBtn".
 * @param className - An optional additional CSS class to apply to the button.
 * @param isLoading - An optional boolean indicating whether the button should display a loading spinner.
 * @returns A React component that renders the button.
 */
import styles from "../../styles/button.module.css";

interface ButtonProps {
  name: string | undefined;
  onClick?: () => void;
  type: "primaryBtn" | "secondaryBtn" | "borderedBtn";
  className?: string;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  name,
  onClick,
  type,
  className,
  isLoading,
}) => {
  return (
    <>
      {type === "primaryBtn" ? (
        <div className="relative">
          <button
            className={`${className} primary-button flex  relative ${styles.primary_icon_button_applied}`}
            onClick={onClick}
          >
            <div className="flex flex-row items-center bg-primary-blue px-4  rounded-full h-[36px] leading-[36px]  text-white hover:bg-primary-hover">
              {isLoading && (
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {name}
            </div>
            <div className="sidearrow">
              <svg
                width="42"
                height="36"
                viewBox="0 0 42 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2741_113238)">
                  <path
                    d="M41.7324 18C41.7324 18.0189 41.7324 18.0379 41.7324 18.0568C41.7159 18.0994 41.6898 18.142 41.6875 18.1845C41.6449 18.7784 41.6094 19.3722 41.5668 19.9661C41.4367 21.7453 41.0084 23.4511 40.2987 25.086C39.2174 27.5749 37.6157 29.683 35.5455 31.429C32.6804 33.847 29.387 35.3281 25.6678 35.8391C25.2513 35.8959 24.8326 35.9479 24.4162 36L22.2584 36C22.0006 35.9645 21.7427 35.9219 21.4824 35.8983C18.5913 35.612 16.0006 34.5308 13.6228 32.903C11.872 31.7058 10.5163 30.1136 9.31917 28.3888C8.21902 26.806 7.18747 25.1759 6.09205 23.586C4.58495 21.3975 2.91223 19.3864 0.290782 18.4472C0.0991432 18.3785 -0.0428131 18.2106 0.00923841 18.0071C0.0494568 17.8533 0.189048 17.7232 0.295516 17.5931C0.326274 17.5552 0.397254 17.5481 0.451667 17.5315C1.87596 17.0371 3.06839 16.1924 4.09756 15.1041C5.2687 13.8667 6.18668 12.4448 7.0952 11.0158C8.23321 9.22949 9.331 7.41719 10.7151 5.80363C13.4454 2.62855 16.9067 0.79022 21.0305 0.170346C21.4753 0.101734 21.9225 0.0567815 22.3696 -8.46374e-07C23.051 -8.16589e-07 23.7324 -7.86805e-07 24.4138 -7.5702e-07C24.4943 0.0165608 24.5747 0.0402201 24.6551 0.0520497C25.4217 0.158517 26.2001 0.217665 26.9548 0.376182C31.0526 1.23975 34.5258 3.21767 37.3081 6.35016C40.1685 9.57255 41.6827 13.3344 41.6875 17.6711C41.6875 17.78 41.7182 17.8888 41.7324 18Z"
                    fill="#2E3192"
                  />
                  <path
                    d="M28.2498 12.8125H28.9998V21.25H27.4998V15.2119L20.5311 21.748L19.9998 22.2461L18.9404 21.25L19.4717 20.752L26.4404 14.2188H19.9998V12.8125H28.2498Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2741_113238">
                    <rect
                      width="36"
                      height="41.7326"
                      fill="white"
                      transform="translate(41.7324) rotate(90)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </button>
        </div>
      ) : type === "secondaryBtn" ? (
        <div className={styles.secondary_button_container}>
          <button
            className={` relative ${styles.secondary_icon_button_applied}`}
            onClick={onClick}
          >
            {" "}
            <div className="flex flex-row bg-white  hover:bg-secondary-blue text-primary-blue px-4 w-[136px] rounded-full h-[36px] leading-[36px]  ">
              {" "}
              {name}
            </div>
            <div className="sidearrow">
              <svg
                width="42"
                height="36"
                viewBox="0 0 42 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1093_48195)">
                  <path
                    d="M41.7324 18C41.7324 18.0189 41.7324 18.0379 41.7324 18.0568C41.7159 18.0994 41.6898 18.142 41.6875 18.1845C41.6449 18.7784 41.6094 19.3722 41.5668 19.9661C41.4367 21.7453 41.0084 23.4511 40.2987 25.086C39.2174 27.5749 37.6157 29.683 35.5455 31.429C32.6804 33.847 29.387 35.3281 25.6678 35.8391C25.2513 35.8959 24.8326 35.9479 24.4162 36L22.2584 36C22.0006 35.9645 21.7427 35.9219 21.4824 35.8983C18.5913 35.612 16.0006 34.5308 13.6228 32.903C11.872 31.7058 10.5163 30.1136 9.31917 28.3888C8.21902 26.806 7.18747 25.1759 6.09205 23.586C4.58495 21.3975 2.91223 19.3864 0.290782 18.4472C0.0991432 18.3785 -0.0428131 18.2106 0.00923841 18.0071C0.0494568 17.8533 0.189048 17.7232 0.295516 17.5931C0.326274 17.5552 0.397254 17.5481 0.451667 17.5315C1.87596 17.0371 3.06839 16.1924 4.09756 15.1041C5.2687 13.8667 6.18668 12.4448 7.0952 11.0158C8.23321 9.22949 9.331 7.41719 10.7151 5.80363C13.4454 2.62855 16.9067 0.79022 21.0305 0.170346C21.4753 0.101734 21.9225 0.0567815 22.3696 -8.46374e-07C23.051 -8.16589e-07 23.7324 -7.86805e-07 24.4138 -7.5702e-07C24.4943 0.0165608 24.5747 0.0402201 24.6551 0.0520497C25.4217 0.158517 26.2001 0.217665 26.9548 0.376182C31.0526 1.23975 34.5258 3.21767 37.3081 6.35016C40.1685 9.57255 41.6827 13.3344 41.6875 17.6711C41.6875 17.78 41.7182 17.8888 41.7324 18Z"
                    fill="white"
                  />
                  <path
                    d="M28.2498 12.8125H28.9998V21.25H27.4998V15.2119L20.5311 21.748L19.9998 22.2461L18.9404 21.25L19.4717 20.752L26.4404 14.2188H19.9998V12.8125H28.2498Z"
                    fill="#2E3192"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1093_48195">
                    <rect
                      width="36"
                      height="41.7326"
                      fill="white"
                      transform="translate(41.7324) rotate(90)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </button>
        </div>
      ) : (
        <div>
          <button
            className={`${className} px-3 py-1 rounded-full hover:bg-[#FFFFFF80]`}
            onClick={onClick}
          >
            {name}
          </button>
        </div>
      )}
    </>
  );
};

export default Button;
