import Link from 'next/link';
import logger from '../pino_logger/logger';

function Header(){
	return (
		<div className="top-bar">
            <div className="menu" id="title"><h1><Link href='/'><a>Quiz &#39;N&#39; Sum</a></Link></h1></div>
		</div>
	);
}

function Main(){
    return (
        <div className="container">
            <Header/>
            <div id="info-title">
                    <h2>Information about Quiz &#39;N&#39; Sum:</h2>
                </div>
            <div id="info-text">
                <div>
                    <ol>
                        <li>
                            Upon pressing the generate button, your text input is forwarded to our
                            server, which will process your input accordingly.
                        </li>
                        <li>
                            Once the process is complete using NLP (Natural Language Processing),
                            a set of questions based on the text you have provided will be sent back to
                            you and displayed below the input box.
                        </li>
                        <li>
                            If you&#39;re happy with your result, you can choose to export the questions
                            generated if you wish.
                        </li>
                    </ol>
                    <span id="note">
                        Note: We do not store or hold any text input you give us, it is simply
                        processed, with the appropriate output handed straight back to you.
                    </span>
                </div>
            </div>
        </div>
    )
}

export default function About(){
    logger.info('Served about website')
    return (
        <>
        <Main/>
        </>
    )
}