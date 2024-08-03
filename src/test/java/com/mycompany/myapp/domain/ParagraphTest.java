package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.ParagraphTestSamples.*;
import static com.mycompany.myapp.domain.PostTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ParagraphTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Paragraph.class);
        Paragraph paragraph1 = getParagraphSample1();
        Paragraph paragraph2 = new Paragraph();
        assertThat(paragraph1).isNotEqualTo(paragraph2);

        paragraph2.setId(paragraph1.getId());
        assertThat(paragraph1).isEqualTo(paragraph2);

        paragraph2 = getParagraphSample2();
        assertThat(paragraph1).isNotEqualTo(paragraph2);
    }

    @Test
    void paragraphTest() {
        Paragraph paragraph = getParagraphRandomSampleGenerator();
        Post postBack = getPostRandomSampleGenerator();

        paragraph.setParagraph(postBack);
        assertThat(paragraph.getParagraph()).isEqualTo(postBack);

        paragraph.paragraph(null);
        assertThat(paragraph.getParagraph()).isNull();
    }
}
